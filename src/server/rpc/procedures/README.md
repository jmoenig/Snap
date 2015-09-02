# Remote Procedure Calls
This directory contains logic to be executed on the server to provide assistance to students by performing some of their computation for them. For example, this could include an endpoint to check if the game is done.

The RPC's in this directory contain code to be executed within a group. That is, their variables are shared among the members of the group (created by the `GroupManagers`) and each group has it's own context.
