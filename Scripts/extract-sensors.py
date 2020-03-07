"""
This script extracts sensor IDs, descriptions, and locations from a months' sensor data as provided by ITSOS.
Usage: extract-sensors.py <input> <output>
The output of this script can be used directly by routetagger.
The input path must be to a directory containing 'speed' folder.
"""

import sys
import csv
from os import listdir
from os.path import basename, isfile, join

def extract_sensor(filename):
    with open(filename) as sensor_file:
        # sensor ID is the filename
        id = basename(filename)[:-4]

        # skip the header
        sensor_file.readline()

        # read location summary
        location_line = sensor_file.readline()
        if location_line.startswith('Location, '):
            name = location_line[len('Location, '):].strip()
        else:
            return None

        # read coordinates summary
        coordinates_line = sensor_file.readline()
        if coordinates_line.startswith('Coordinates (X,Y):, '):
            coordinates_str = coordinates_line[len('Coordinates (X,Y):, '):]
            coordinates_str_split = coordinates_str.split('/')
            coordinates = [float(c) for c in coordinates_str_split]
        else:
            return None

        datum = id, name, coordinates[0], coordinates[1]
        # print(datum)
        return datum

def extract_sensors(dirname):
    speed_dir_path = join(dirname, 'speed')
    all_paths = [join(speed_dir_path, f) for f in listdir(speed_dir_path)]
    sensor_data = [extract_sensor(f) for f in all_paths if isfile(f)]
    sensor_data = [d for d in sensor_data if d is not None]
    return sensor_data

def write_sensor_data(sensor_data, path):
    with open(path, mode='w') as sensor_file:
        sensor_writer = csv.writer(
            sensor_file,
            delimiter=',',
            quotechar='"',
            quoting=csv.QUOTE_NONNUMERIC,
            lineterminator='\n')
        sensor_writer.writerow(['id', 'description', 'lat', 'lng'])
        
        for sensor_datum in sensor_data:
            sensor_writer.writerow(sensor_datum)

def run(from_path, to_path):
    sensor_data = extract_sensors(from_path)
    write_sensor_data(sensor_data, to_path)

try:
    if len(sys.argv) != 3:
        print('usage: extract-sensors.py <from> <to>')
    else:
        run(sys.argv[1], sys.argv[2])
except:
    input()
