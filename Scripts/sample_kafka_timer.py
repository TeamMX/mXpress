"""
This script writes stdin to stdout with a delay factor. It assumes input is of the format '<sensorid> <timestamp> <speed>' and
prints slowly to stdout to simulate data being received at the associated timestamp.
It takes in an argument, delayfactor, which divides the difference between timestamps. The default value of 300 (5 minutes) assumes
the timestamp is in seconds and waits only 1 second for a reported 5 minute delay.
On linux, it should be run as 'cat <filename> | python sample_kafka_timer.py <delayfactor> | kafka-console-producer.sh [kafka args]'
"""

from sys import stdin, argv
from time import sleep

def run(factor):
    last_timestamp = None
    for line in stdin:
        # assumes we haven't hit Y2K sequel yet
        timestamp = int(line.split()[1])
        if last_timestamp != None and last_timestamp < timestamp:
            delay = float(timestamp - last_timestamp) / factor
            sleep(delay)
        print(line)
        last_timestamp = timestamp
        

def main():
    factor = int(argv[1]) if len(argv) == 2 else 300
    run(factor)

if __name__ == "__main__":
    main()
