# Kafka Installation Documentation - How To & Lessons Learned

https://www.digitalocean.com/community/tutorials/how-to-install-apache-kafka-on-centos-7
omitting steps 5, 7, & 8.

A topic 'testtopic' was created and seeded with sample data using the provided spark console applications.

To test remote access from spark, the following command was run: `bin/spark-shell --packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.4.4` with `spark.read.format("kafka").option("kafka.bootstrap.servers","192.168.10.8:9092").option("subscribe","testtopic").load().show`

The following error message repeated in a loop (with increasing timestamp) for over 60 seconds before `spark-shell` was exited with `Ctrl-C`:
```
2020-02-20 11:51:45.002 WARN clients.NetworkClient: [Consumer clientId=consumer=1, groupId=spark=kafka=relation-58462157-7da0-416f-9bde-d8cd9dc03e4f-driver-0] Connection to node 0 could not be established. Broker may not be available.
```

The solution was to add the line `listeners=PLAINTEXT://192.168.10.8:9092` to `config/server.properties` in the kafka install directory. This solution is based on [this stackoverflow answer](https://stackoverflow.com/a/50367354). Specifically, the IP address specified in `listeners=etc.` must match the IP address the client is using to connect to the kafka server.

Our hypothesis is that while kafka defaults to listening to the machine's hostname if this field is not provided, the machine's hostname was the server IP and not the individual kafka VM IP address. Thus, when running kafka on a virtual machine, the IP of the virtual machine is required in `server.properties`.

fix time: ~10 hours
