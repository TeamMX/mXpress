"""
This script converts a HERE Streets shapefile (.dbf and .shp) to a csv for consumption by routemapper.py. The output is printed to stdout.
Usage: python extract_here.py <path-to-streets-file-without-extension> > out.csv
For each link, 2 records are created for forward/backward travel. Forward travel is denoted with 'T' and backward with 'F' following the link id.
The produced CSV has the column 'distance' with the value '0' for all records; this is needed for compatibility with routemapper.py
"""

import sys
import shapefile

def extract_geo(from_file):
    with shapefile.Reader(from_file) as shp:
        print("id,waypoints,distance")
        for sr in shp.iterShapeRecords():
            points = sr.shape.points
            first = points[0]
            last = points[-1]
            print("{id}T,{start_lat}/{start_lng};{end_lat}/{end_lng},0".format(id = sr.record[0], start_lng = first[0], start_lat = first[1], end_lng = last[0], end_lat = last[1]))
            print("{id}F,{end_lat}/{end_lng};{start_lat}/{start_lng},0".format(id = sr.record[0], start_lng = first[0], start_lat = first[1], end_lng = last[0], end_lat = last[1]))

def main():
    if len(sys.argv) != 2:
        print("Usage: {filename} <from>".format(filename=sys.argv[0]))
    else:
        extract_geo(sys.argv[1])

if __name__ == "__main__":
    main()
