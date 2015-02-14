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

function cppGetRandomId(randomStream, num)
{
    return CppRandomNames[num][randomStream.nextIntRange(CppRandomNames[num].length)];
}

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
