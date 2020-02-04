import sys
import shapefile

def extract_geo(from_file):
    with shapefile.Reader(from_file) as shp:
        print("link_id,start_lng,start_lat,end_lng,end_lat")
        for sr in shp.iterShapeRecords():
            points = sr.shape.points
            first = points[0]
            last = points[-1]
            print("{link_id},{start_lng},{start_lat},{end_lng},{end_lat}".format(link_id = sr.record[0], start_lng = first[0], start_lat = first[1], end_lng = last[0], end_lat = last[1]))

def main():
    if len(sys.argv) != 2:
        print("Usage: {filename} <from>".format(filename=sys.argv[0]))
    else:
        extract_geo(sys.argv[1])

if __name__ == "__main__":
    main()
