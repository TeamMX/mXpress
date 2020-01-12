"""
This script converts routetagger files to a CSV file with the OSM node segment ids.
Usage: routetmapper.py <input> <output>
Output file format: a CSV with headers; col 1: sensor ID; col 2: space-separated OSM node IDs
"""

import sys
import csv
import httplib
import urllib
import json
import os

def get_csv_lines(filename):
    with open(filename, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            if len(row['waypoints']):
                yield row
            else:
                print 'sensor missing waypoints:', row['id']

def extract_path(raw_path):
    waypoints_raw = raw_path.split(';')
    waypoints = [extract_waypoint(waypoint_raw) for waypoint_raw in waypoints_raw]
    return waypoints

def extract_waypoint(raw_waypoint):
    coords_raw = raw_waypoint.split('/')
    coords = [float(coord_raw) for coord_raw in coords_raw]
    return (coords[0], coords[1])

def get_osm_path(path):
    path_string = get_osrm_path_string(path)
    conn = httplib.HTTPConnection('localhost:5000')
    conn.request('GET', '/route/v1/driving/%s?annotations=true' % path_string)
    response = conn.getresponse()
    assert response.status == 200
    data_str = response.read()
    data_json = json.loads(data_str)
    route = data_json['routes'][0]
    assert len(route['legs']) == 1
    nodes = [str(n) for n in route['legs'][0]['annotation']['nodes']]
    distance = route['distance']
    return (distance, nodes)

def get_osrm_path_string(path):
    return ';'.join(('%s,%s') % (w[1], w[0]) for w in path)

def get_final_obj(row):
    path = extract_path(row['waypoints'])
    actual_dist, actual_nodes = get_osm_path(path)
    print row['id'], row['distance'], actual_dist, actual_nodes
    return row['id'], actual_nodes

def run(filename, outfile):
    csv = get_csv_lines(filename)
    results = (get_final_obj(row) for row in csv)
    with open(outfile, mode='w+') as out:
        out.write('id,path\n')
        for id, nodes in results:
            out.write('%s,%s\n' % (id, ' '.join(nodes)))

try:
    run(sys.argv[1], sys.argv[2])
except:
    print sys.exc_info()[1]
    input()
