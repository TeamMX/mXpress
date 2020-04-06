"""
The revised kafka driver that increments timestamps.
"""

from sys import stdin, argv
from time import sleep

def loop_file(file):
    while True:
        with open(file) as f:
            for line in f:
                entries = line.split()
                yield entries[0], long(entries[1]), entries[2]

def run(file, factor):
    last_timestamp = None
    acc = 0
    for id, timestamp, speed in loop_file(file):
        if last_timestamp is not None:

            if last_timestamp > timestamp:
                acc += last_timestamp - timestamp

            elif timestamp > last_timestamp:
                delay = (timestamp - last_timestamp) / factor
                sleep(delay)

        print("{0} {1} {2}".format(id, timestamp + acc, speed))
        last_timestamp = timestamp

def main():
    factor = int(argv[2]) if len(argv) == 3 else 300
    run(argv[1], factor)

if __name__ == "__main__":
    main()
