FROM openjdk:8-alpine

RUN apk --update add wget tar bash

RUN wget http://apache.mirror.anlx.net/spark/spark-2.4.5/spark-2.4.5-bin-hadoop2.7.tgz

ARG SCALA
ARG SBT

ENV SCALA ${SCALA:-2.13.1}
ENV SBT ${SBT:-1.3.8}

RUN tar -xzf spark-2.4.5-bin-hadoop2.7.tgz && \
mv spark-2.4.5-bin-hadoop2.7 /spark && \
rm spark-2.4.5-bin-hadoop2.7.tgz

COPY start-masterx.sh /start-masterx.sh
COPY start-worker.sh /start-worker.sh
RUN chmod +x start-masterx.sh
RUN chmod +x start-worker.sh

RUN mkdir -p /usr/lib/jvm/java-1.8-openjdk/jre && \
touch /usr/lib/jvm/java-1.8-openjdk/jre/release && \
apk add -U --no-cache bash curl && \
curl -fsL http://downloads.typesafe.com/scala/$SCALA/scala-$SCALA.tgz | tar xfz - -C /usr/local && \
ln -s /usr/local/scala-$SCALA/bin/* /usr/local/bin/ && \
scala -version && \
scalac -version

RUN curl -fsL https://github.com/sbt/sbt/releases/download/v$SBT/sbt-$SBT.tgz | tar xfz - -C /usr/local && \
$(mv /usr/local/sbt-launcher-packaging-$SBT /usr/local/sbt || true) \
ln -s /usr/local/sbt/bin/* /usr/local/bin/ && \
sbt sbt-version || sbt sbtVersion || true

# WORKDIR /local

# ENTRYPOINT ["/usr/local/bin/sbt"]
# ENTRYPOINT ["/"]