rd /s/q node_modules
rd /s/q %USERPROFILE%\pkg
mkdir %USERPROFILE%\pkg

call yarn config set yarn-offline-mirror %USERPROFILE%\pkg
@REM call yarn config set yarn-offline-mirror-pruning false
call yarn cache clean
call yarn install
copy yarn.lock %USERPROFILE%\pkg
jar cvfM test.yarn.lock.zip -C %USERPROFILE%\pkg .