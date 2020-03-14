#!/bin/sh
# this script is the driver for fake historical telemetry being piped into the kafka instance

while :
do
  tail -n +2 /home/kafka/kafka-sample-input | python /home/kafka/sample_kafka_timer.py 60 /home/kafka/kafka/kafka-console-producer.sh --broker-list 192.168.10.8:9092 --topic capstone
done
