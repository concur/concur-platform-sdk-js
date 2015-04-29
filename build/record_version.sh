#! /bin/bash

# only execute this if the branch is dev and it's not a pull request to the branch
if [ $PULL_REQUEST == 'false' ]
then
  # update the package verion and commit to the git repository
  npm version patch -m "Package version %s created from build $BUILD_NUMBER [ci skip]"

  # use the key that Shippable uses to connect to GitHub
  ssh-agent bash -c "ssh-add ~/.ssh/project_rsa; git push --tags origin $BRANCH"
else
  echo 'Not incrementing version number for pull requests'
fi
