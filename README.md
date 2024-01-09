
NetsBlox (client source code)

https://netsblox.org

An extension of Snap providing networking capabilities, collaborative editing and comprehensive undo/logging support.

For a deployment ready version of NetsBlox, check out the [main repo](https://github.com/netsblox/netsblox).

## Quick Start
If you need to make changes only to the client side of netsblox if it is a change that is generic and everyone could benefit from [fork us and make a pull request](https://github.com/NetsBlox/Snap--Build-Your-Own-Blocks/pulls).
Otherwise, you can always host the NetsBlox client and point it to our server. This way you can still:
1. communicate with other users on main NetsBlox server
2. use our server deployment so you don't have to setup and maintain your own
3. have access to all the services already available and configured on NetsBlox.

To host your own client files, first install dependencies:
```
cd utils/  
npm install
```
Next, the cloud client needs to be built:
```
cd src/cloud
npm install
npm run build
```

Then return to the project root and start the file server with
```
node utils/serve.js
```

## Contact
For questions about netsblox, feel free to make an issue or reach out to:
- Akos Ledeczi at akos.ledeczi@vanderbilt.edu
- Hamid Zare at hamid.zare@vanderbilt.edu
- Brian Broll at brian.broll@vanderbilt.edu

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

Want to use NetsBlox but scared by the open-source license? Get in touch with us,
we'll make it work.

Snap! is Copyright (C) 2008-2020 by Jens Mönig and Brian Harvey
NetsBlox is Copyright (C) 2020 Vanderbilt University
