# Weighted Speeds Algorithm

Objective: given a stream of timestamped telemetry for OSM segments, store a live view of the current traffic speeds. A single road segment may be covered by many sensors, so telemetry from overlapping sensors should be considered.

## Alternatives

1. accept record with most recent timestamp
2. use a modified exponential weighted average

While accepting the most recent segment speed with is the simpler solution, it does not handle the case where multiple sensors provide conflicting data for a single road segment at the same time.

A modified exponential weighted average algorithm follows that incorporates telemetry from multiple sensors arriving at or near the same time. Save in DB a 'weight' and 'value'; dividing 'weight' by 'value' will yield the actual value. If a record does not exist for the given road segment, it is created with the initial values. Otherwise, the following formulas are used to update an existing record:

```
deltaTimestamp = new.timestamp - old.timestamp
decayFactor = 0.5 ^ (deltaTimestamp / halflife)

timestamp = new.timestamp
weight = new.weight + old.weight * decayFactor
value = new.value + old.value * decayFactor
```

In a typical weighted average implementation, the new value and weight would be multiplied by `(1 - decayFactor)`. However, experimental tests have shown that this is not necessary when the value is divided by the weight to get the final result as is our case.

Variable in the exp weighted average is this 'half-life' parameter. Small value so more recent telemetry has higher weight than older telemetry. such as: 10 seconds.

## Implementation Notes

Naive implementation: select-modify-update loop. Reads from db, modifies object in-memory, then replaces it. Problem: two database interactions; also issues of concurrency (select-select-update-update). Transactions may slow things down, or make data less reliable if a concurrency scheme not used. Suggests update should be performed in-place with a single database command; db engine will execute this internally in a single transaction. Solves transaction issue and halves number of database interactions.

Implementation constructs a mongodb update query that applies the telemetry to the existing record (creating it if it does not exist) according to the specified algorithm.

## Batch Process

Objective: somehow collect useful historical data.

Solution: divide data from sensors into buckets within a 24-hour time period. Since unix timestamps ignore leap seconds, taking timestamp modulo 24 * 60 * 60 is effective way to sort into buckets. Buckets can further be combined (such as into 5 minute intervals) when our system only receives records every 20 seconds. This minimizes or eliminates the number of 'buckets' that do not contain recent information. When comparing historical data for a given time of day to produce current day estimate, exponential weighted average by timestamp (more recent values having higher weight) used. Different half-life, such as 2 days, used since batch deals in longer time periods.

## Combining Them into OSRM CSV

Naive implementation: average of batch and stream results. When one is missing, just use the one that is present. Can be tuned later.

## Future Work

Incorporating machine learning to the batch process. Time series analysis. Further tune the combination of batch and stream results based on how confident we are in the results.
