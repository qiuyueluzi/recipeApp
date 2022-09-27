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
    int cnt = 0, i = 0, j = 0, k = 0;
    string str, file_name = argv[1];
    vector<string> line, s_cate;    //文字列読み込み用配列

    stringstream path;  //ディレクトリのパスを指定
    path << "/home/hika4423/github/recipe/recipeApp/recipeApp/data_file/category/";

    //入出力ファイルを指定
    ifstream in_file(path.str() + file_name);
    ofstream out_file1(path.str() + file_name.erase(file_name.find('.')) + "_l.csv");
    ofstream out_file2(path.str() + file_name + "_s.csv");
    ofstream out_file3(path.str() + "item_tag.csv");


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
            out_file1 << ++i << "," << line[cnt] << endl;
            //cout << name[j++] << endl;
        }

        if(line[cnt].find("text") != string::npos && line[cnt].find("品)") == string::npos && line[cnt].find("class") == string::npos){
            line[cnt] = rm_char(line[cnt], ' ');
            line[cnt].erase(line[cnt].end()-1);
            line[cnt].erase(0, 8);
            s_cate.push_back(line[cnt]);
        }
        cnt++;
    }

    for(int n = 0; n < 31; n++){
        s_cate.erase(s_cate.begin());
    }

    for(int n = 1196; n > 917; n--){
        s_cate.pop_back();
    }

    for(auto n = s_cate.begin(); n != s_cate.end(); n)
    {
        if(j < 459) out_file2 << ++j << "," << *n++ << endl;
        else out_file3 << ++k << "," << *n++ << endl;
    }
    

    in_file.close();
    out_file1.close();
    out_file2.close();
    out_file3.close();

    return 0;
}