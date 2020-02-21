#!/bin/sh
# this script runs the spark batch job and pulls the produced csv from hdfs onto the local client
# the other script that calls it expects this file to be named 'script.sh' and placed in the root directory

echo "Deleting original file..."
hadoop fs -rm -r -f osrm-update-speeds.csv
echo "Submitting micro-batch spark job..."
/usr/spark/spark-2.4.4-bin-hadoop2.7/bin/spark-submit --packages org.mongodb.spark:mongo-spark-connector_2.11:2.4.1 --class "OsrmAdapterBatch" /home/spark_1/repos/osrm-adapter-batch/target/scala-2.11/osrm-adapter-batch_2.11-1.0.jar mongodb://localhost:27017/capstone.capstone osrm-update-speeds.csv
echo "Downloading & merging osrm update speeds from hdfs..."
hadoop fs -getmerge osrm-update-speeds.csv ./osrm-update-speeds.csv
echo "Done."
