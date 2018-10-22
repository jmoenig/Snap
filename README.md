
NetsBlox (client source code)

https://netsblox.org

An extension of Snap providing networking capabilities, collaborative editing and comprehensive undo/logging support.

For a deployment ready version of NetsBlox, check out the [main repo](https://github.com/netsblox/netsblox).

## Running the client independently
If you need to make changes only to the client side of netsblox if it is a change that is generic and everyone could benefit from [fork us and make a pull request](https://github.com/NetsBlox/Snap--Build-Your-Own-Blocks/pulls).
Otherwise, you can always statically host the NetsBlox client and point it to our server. This way you can still:
1. communicate with other users on main NetsBlox server
2. use our server deployment so you don't have to setup and maintain your own
3. have access to all the services already available and configured on NetsBlox.

In order to do so you just need to provide the fully qualified address of the server you want to connect to by setting `REMOTE_SERVER_URL` in `index.dev.html`. You could then rename that file to `index.html` to have it loaded automatically in the browser.

## Contact
For questions about netsblox, feel free to make an issue or reach out to:
- Akos Ledeczi at akos.ledeczi@vanderbilt.edu
- Hamid Zare at hamid.zare@vanderbilt.edu
- Brian Broll at brian.broll@vanderbilt.edu

