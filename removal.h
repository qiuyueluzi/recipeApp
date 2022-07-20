#include <algorithm>
#include <string>
using namespace std;
using std::string;

string rm_bet(string str, string a, string b)    //文字列除去関数
{
    while (str.find(a) != string::npos && str.find(b) != string::npos)  //a から b までの文字列を除去
    {
        str.erase(str.find(a), str.find(b)-str.find(a)+1);
    }
    return str;
}

string rm_aro(string str, string a, string b)
{
    while (str.find(a) != string::npos && str.find(b) != string::npos)  //a から b 以外の文字列を除去
    {
        str.erase(str.find(b), str.size()-str.find(b));
        str.erase(0, str.find(a)+3);
    }
    return str;
}

string rm_char(string &str, char s)
{
    str.erase(std::remove(str.begin(), str.end(), s), str.end());

    return str;
}
