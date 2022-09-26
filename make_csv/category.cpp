#include <iostream>
#include <iomanip>
#include <fstream>
#include <sstream>
#include "removal.h"
/*ヘッダファイル用参照
string, algorithm, vectorインクルード
split関数、rm_bet関数、rm_aro関数、rm_char関数
*/
using namespace std;
using std::cout;    using std::cerr;
using std::endl;    using std::string;

int main(int argc, char *argv[])
{
    int cnt = 0, i = 0;
    string str, file_name = argv[1];
    vector<string> line;    //文字列読み込み用配列

    stringstream path;  //ディレクトリのパスを指定
    path << "/home/hika4423/github/recipe/recipeApp/recipeApp/data_file/category/";

    //入出力ファイルを指定
    ifstream in_file(path.str() + file_name);
    ofstream out_file(path.str() + file_name.erase(file_name.find('.')) + ".csv");

    if(!in_file.is_open()){
        //ファイルオープン時のエラー処理
        cerr << argv[1] << " - ファイルを開けませんでした" << endl;

        return EXIT_FAILURE;
    }else{
        //1行づつ配列に読み込む
        while (getline(in_file, str)) line.push_back(str);
        
    }

    auto it = line.begin();
    while (*it++ != "\0")
    {   //textと品を含む行からカテゴリー名を抽出
        if(line[cnt].find("text") != string::npos && line[cnt].find("品") != string::npos){
            line[cnt] = rm_bet(rm_char(line[cnt], ' '), "(", ")");
            line[cnt].erase(line[cnt].end()-1);
            line[cnt].erase(0, 8);
            out_file << ++i << "," << line[cnt] << endl;
            //cout << line[cnt] << endl;
        }
        cnt++;
    }

    in_file.close();
    out_file.close();

    return 0;
}