#!/bin/sh
        PROCESS_NUM=$(ps -ef | grep "/opt/ManageEngine/OpManager/jre/bin/java -Dfile.encoding=UTF-8 -Djava.net.preferIPv4Stack=true -Xmx2048m -jar LSCableCMS-2.0.jar" | grep -v "grep" | wc -l)
        if [ $PROCESS_NUM -eq 1 ];
        then
                echo "Process is already running"
        else
                /opt/ManageEngine/OpManager/jre/bin/java -Dfile.encoding=UTF-8 -Djava.net.preferIPv4Stack=true -Xmx2048m -jar LSCableCMS-2.0.jar  --spring.config.location=./config.properties > /dev/null 2>&1 &
        fi

