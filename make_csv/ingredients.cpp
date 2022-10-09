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

int flag = 0;

class Ingredients
{
    protected:
        long ID;
            vector<string> line, ingredient, quantity;//文字列読み込み用配列

    public:
        int input(string p, string f){
            //入力ファイルを指定
            ifstream in_file(p + "tmp/" + f);

            if(!in_file.is_open()){
                //ファイルオープン時のエラー処理
                cerr << f << " - ファイルを開けませんでした" << endl;

                return EXIT_FAILURE;
            }else{
                string str;
                while(getline(in_file, str)){
                    str = rm_char(str, ',');
                    line.push_back(str);
                }
            }

            in_file.close();

            return 0;
        }
        void output(string p, string f){
            //出力ファイルの指定
            ofstream out_file(p + f.erase(f.find(".")) + ".csv");
            
            for(auto l = line.begin(); l != line.end(); ++l){
                //out_file << ID << "," + *l << endl;
            }
            cout << ingredient.size() <<":"<< quantity.size() << endl;
            for(int i = 0; i < ingredient.size(); i++)
            {
                out_file << ID << "," << ingredient[i] + "," + quantity[i] << endl;
                //cout << i << endl;
            }
            
            out_file.close();
        }
};

class Ajinomoto : public Ingredients    //味の素クラス
{
    public:
        void setID_URL(string file_name)    //ID、URL設定用メンバ関数
        {
            ID = stol(file_name) + 20000000;
        }
        void setIQ()
        {
            string str, sub;
            for(auto l = line.begin(); l != line.end(); ++l){
                str = rm_char(*l, ' '); //スペースを除去
                //cout << str << endl;
                if(str.find("class") != string::npos || str.find("tag") != string::npos || str.find("text") != string::npos){
                    //材料名を抽出
                    if(str.find("text") != string::npos && flag == 0){
                        str.erase(str.end()-1);
                        str.erase(0, 8);
                        sub = str;
                    }else if(str.find("text") != string::npos && flag == 1){
                        str.erase(str.end()-1);
                        str.erase(0, 8);
                        //cout << str << endl;
                        quantity.push_back(str);
                        flag = 0;
                    }

                    if(str.find("tag") != string::npos && str.find("dd") != string::npos && flag == 0){
                        ingredient.push_back(sub);
                        flag = 1;
                    }
                    if(str.find("class") != string::npos && flag == 0){
                        str.erase(str.end()-1);
                        str.erase(0, 12);
                        //cout << str << endl;
                        if(str.find("A") != string::npos
                            || str.find("B") != string::npos
                            || str.find("C") != string::npos
                            || str.find("D") != string::npos){
                            sub = str + " " + sub;
                        }//else if(str.empty()) flag = 0;
                    }
                }
            }
        }
};

int main(int argc, char *argv[])
{
    string dir = argv[1], file_name = argv[2];//ディレクトリ名・ファイル名を代入

    stringstream path;//出力用ディレクトリパスの指定
    path << "../data_file/" + dir + "/ingredients/";

    Ingredients i;
    Ajinomoto Aji;

    if(dir == "ajinomoto"){
        //ファイルが正常に開けた場合は実行
        if(Aji.input(path.str(), file_name) == 0){
            //メンバ関数の実行
            Aji.setID_URL(file_name);
            Aji.setIQ();
            //cout << "ok" << endl;
            Aji.output(path.str(), file_name);
        }else return EXIT_FAILURE;
    }

    return 0;
}