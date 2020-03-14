# Weighted Speeds Algorithm

Objective: given a stream of timestamped telemetry for OSM segments, store a live view of the current traffic speeds. A single road segment may be covered by many sensors, so telemetry from overlapping sensors should be considered.

## Alternatives

1. accept record with most recent timestamp
2. use a modified exponential weighted average

While accepting the most recent segment speed with is the simpler solution, it does not handle the case where multiple sensors provide conflicting data for a single road segment at the same time.

A modified exponential weighted average algorithm follows that incorporates telemetry from multiple sensors arriving at or near the same time. TODO WRITE MORE.

Variable in the exp weighted average is this 'half-life' parameter. Ideally small value so more recent telemetry has a higher weight in 

## Implementation Notes

Naive implementation: select-modify-update loop. Reads from db, modifies object in-memory, then replaces it. Problem: two database interactions; also issues of concurrency (select-select-update-update). Transactions may slow things down, or make data less reliable if a concurrency scheme not used. Suggests update should be performed in-place with a single database command; db engine will execute this internally in a single transaction. Solves transaction issue and halves number of database interactions.

Implementation constructs a mongodb update query that applies the telemetry to the existing record (creating it if it does not exist) according to the specified algorithm.
