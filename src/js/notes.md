installation of the babel was a three steps process 
first is to install packages ( babel-core, babel-loader,babel-preset-env). 
then add the rule with the babel-loader, in webpack config file. 
Second, we created the config file that stated which files we want to convert to 
es5. 
And finally at the third stage we installed polyfill to handle the files that cannot be converted 
to the es5. 