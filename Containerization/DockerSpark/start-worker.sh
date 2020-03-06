#!/bin/sh

/spark/bin/spark-class org.apache.spark.deploy.worker.Worker --webui-port $SPARK_WORKER_UI_PORT $SPARK_MASTER