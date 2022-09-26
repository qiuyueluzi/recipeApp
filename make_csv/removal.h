#include <algorithm>
#include <string>
#include <vector>
using namespace std;
using std::string;

vector<string> split(const string& str, const char* del)  //文字列分割関数
{
    vector<string> vec;
    string::size_type len = str.length();
    for(string::size_type i = 0, n; i < len; i = n + 1){
        n = str.find_first_of(del, i);
        if(n == string::npos) n = len;
        vec.push_back(str.substr(i, n - i));
    }

    return vec;
}

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

string rm_char(string &str, char s) //sの文字を除去
{
    str.erase(std::remove(str.begin(), str.end(), s), str.end());

    return str;
}

string Replace_all(string& str, const string& a, const string& b) { //aからbの文字列へ全て変換
    //string tmp(str);
    while(str.find(a) != string::npos)
        str.replace(str.find(a), b.length(), b);
    return str;
}