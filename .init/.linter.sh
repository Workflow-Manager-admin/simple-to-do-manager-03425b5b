#!/bin/bash
cd /home/kavia/workspace/code-generation/simple-to-do-manager-03425b5b/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

