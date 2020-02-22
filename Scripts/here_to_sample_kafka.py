"""
This script converts a single HERE csv file into a format suitable for use as an input to a kafka stream.
"""

import calendar
import time
import sys
import pandas as pd

def date_str_to_timestamp(date_str):    
    return calendar.timegm(time.strptime(date_str, "%Y-%m-%d %H:%M"))

def extract_telemetry(path):
    data = pd.read_csv(path)
    data.sort_values('DATE-TIME', inplace=True)
    for index, row in data.iterrows():
        sensorid = row['LINK-DIR']
        timestamp = date_str_to_timestamp(row['DATE-TIME'])
        speedkph = row['FREEFLOW']
        print("{sensorid} {timestamp} {speedkph}".format(sensorid=sensorid, timestamp=timestamp, speedkph=speedkph))

def main():
    if len(sys.argv) != 2:
        print("Usage: {filename} <from>".format(filename=sys.argv[0]))
    else:
        extract_telemetry(sys.argv[1])

if __name__ == "__main__":
    main()
