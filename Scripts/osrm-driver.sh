#!/bin/sh
# this script is the driver for the osrm server with periodic spark updates

echo "Starting Script..."
while :
do
  echo "Running remote spark job..."
  echo "./script.sh" | ssh spark_1@192.168.10.4
  echo "Downloading File..."
  scp spark_1@192.168.10.4:~/osrm-update-speeds.csv osrm-update-speeds.csv
  echo "Applying speed file..."
  ~/osrm-backend/build/osrm-customize ~/OSRM_Mapping_Data/ontario-latest.osrm --segment-speed-file osrm-update-speeds.csv
  echo "Spawning new osrm server..."
  ~/osrm-backend/build/osrm-routed --algorithm=MLD ~/OSRM_Mapping_Data/ontario-latest.osrm &
  echo "Killing old server..."
  kill $old
  echo "Saving reference to new server..."
  old=$!
  echo "Sleeping 20 seconds..."
  sleep 20
done

