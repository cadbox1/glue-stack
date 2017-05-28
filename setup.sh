DATABASENAME=hammer

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    # https://github.com/mxcl/homebrew/wiki/installation
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
    brew update
fi

brew install mysql
mysql.server restart
mysql -uroot -e "CREATE DATABASE ${DATABASENAME} /*\!40100 DEFAULT CHARACTER SET utf8 */;"

brew install maven

brew install node

brew install yarn
