#!/bin/bash

# JMeter Search API Load Test Runner
echo "Starting JMeter Load Test..."

# Check if JMeter is installed
if ! command -v jmeter &> /dev/null; then
    echo "JMeter is not installed or not in PATH"
    echo "Please install JMeter from: https://jmeter.apache.org/download_jmeter.cgi"
    exit 1
fi

# Create reports directory
mkdir -p performance/reports

# Run JMeter test
echo "📊 Running load test with 50 users, 20 iterations each (1000 total requests)..."
jmeter -n -t performance/jmeter/search-load-test.jmx \
       -l performance/reports/jmeter-results.jtl \
       -e -o performance/reports/jmeter-html-report \
       -j performance/reports/jmeter.log

# Check if test completed successfully
if [ $? -eq 0 ]; then
    echo "JMeter test completed successfully!"
    echo "HTML Report: performance/reports/jmeter-html-report/index.html"
    echo "Results CSV: performance/reports/jmeter-results.jtl"
    echo "Logs: performance/reports/jmeter.log"
else
    echo "JMeter test failed!"
    exit 1
fi

