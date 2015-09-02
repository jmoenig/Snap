# Communication Paradigms
*Groups* are created to manage the scope of network communication between NetsBlox apps. These group managers represent different methods for creating and managing these groups and the messaging between members of the group. I will refer to these different communication assumptions and rules as different *messaging paradigms*.

Some examples of messaging paradigms are as follows:
+ **Basic**- All messages are shared among all other players in a single group
+ **Two Player**- Players are placed into groups of 2 which then share messages
+ **Two Player Turn Based**- Players are placed in groups of 2 and cannot send a message twice in a row
+ **Unique Role**- Players are grouped by a "role" where each group can only have one player with a given role

**Note**: I should be able to implement paradigms which require the same app being played as another paradigm.
