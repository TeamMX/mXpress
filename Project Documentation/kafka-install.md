# Kafka Installation Documentation - How To & Lessons Learned

https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-centos-7
omitting steps 5, 7, & 8.

to test, command was run: `bin/spark-shell --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.4` with `spark.read.format("kafka").option("kafka.bootstrap.servers","192.168.10.8:9092").option("subscribe","testtopic").load().show`
