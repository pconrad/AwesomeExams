CppRandomNames =
[
    ["foo","bar","baz","fiddle","faddle","bim","bam","quux","snork","snap"],
    ["squish","squash","smoot","spiffle","splin","squal","spork","smop","smick","smock"],
    ["blarp","squeeble","blurgle","podiddle","tulopulop","porskidor","swamwam"],
    ["MOOP","MooP","mOOp","mooP","Moop","moop","minx","mox","mole","moof","moog"]
];
CppRandomTypes = [ "int", "double", "bool", "void" ];
CppBoolComparisons = [ "==", "!=", ">", "<", ">=", "<=" ];
RandomReturnTypes = ["int", "float", "double", "string"];

function getRandomReturnType(randomStream)
{
    return RandomReturnTypes[randomStream.nextIntRange(4)];
}

function cppGenerateRandomValue(randomStream, num)  // 0: integer, 1: double, 2: boolean
{
    switch(num)
    {
        case 0:
            return randomStream.nextIntRange(100);
        case 1:
            return randomStream.nextIntRange(99) + "." + randomStream.nextIntRange(99);
        default:
            return ["true", "false"][randomStream.nextIntRange(2)];
    }
}

function cppGetRandomId(randomStream, num)
{
/*    var id;

    switch(num){
        case 0:
            id = CppRandomNames.one[randomStream.nextIntRange(CppRandomNames.one.length)];
            break;
        case 1:
            id = CppRandomNames.two[randomStream.nextIntRange(CppRandomNames.two.length)];
            break;
        case 2:
            id = CppRandomNames.three[randomStream.nextIntRange(CppRandomNames.three.length)];
            break;
        case 3:
            id = CppRandomNames.four[randomStream.nextIntRange(CppRandomNames.four.length)];
            break;
        default:
            break;
    }
*/
    return CppRandomNames[num][randomStream.nextIntRange(CppRandomNames[num].length)];
}
