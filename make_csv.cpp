#include <iostream>
#include <iomanip>
#include <fstream>
#include <sstream>
#include "removal.h"
/*ヘッダファイル用参照
string, algorithm, vectorインクルード
split関数、rm_bet関数、rm_aro関数、rm_char関数
*/
#define N 50
using namespace std;
using std::cout;    using std::cerr;
using std::endl;    using std::string;

int c_1 = 0, c_2 = 0, c_3 = 0;  //材料・分量・手順カウンター
int flag1 = 0, flag2 = 0;               //行数カウンター

class Recipe    //基底クラス
{
    protected:  //メンバ変数の宣言
        long ID;                                        //ID
        float cal, salt, num_p, time;                   //カロリー、塩分、想定人数、調理時間
        string name;    ostringstream url;              //料理名、URL
        string ingredient[N], quantity[N], make_l[N];   //材料、分量、手順
    public:
        void csv_out(string dir, string file_name){     //csvファイル出力用メンバ関数
            int i = 0;
            cout << dir<< endl;
            cout << ID << endl;

            //出力ファイルのパスを指定
            ofstream    ofs_1("./data_file/" + dir +"/recipes/" + file_name.erase(file_name.size()-4) + ".csv"),
                        ofs_2("./data_file/" + dir +"/ingredients/" + file_name + ".csv"),
                        ofs_3("./data_file/" + dir +"/make_list/" + file_name + ".csv");
            ofs_1 << ID << "," << name << "," << cal << "," << salt << "," << num_p << "," << time << "," << url.str() << endl;

            while(ingredient[i] != "\0" && quantity[i] != "\0"){
                ofs_2 << ID << "," << ingredient[i] << "," << quantity[i++] << endl;
            }
            i = 0;
            while(make_l[i] != "\0") {
                ofs_3 << ID << "," << i+1 << "," << make_l[i++] << endl;
            }

            ofs_1.close();
            ofs_2.close();
            ofs_3.close();
        }
};

//以下派生クラスで文字列抽出機能を実装
class ajinomoto : public Recipe //味の素クラス
{
    //using Recipe::Recipe;
    public:
        void setID_URL(string file_name)    //ID、URL設定用メンバ関数
        {
            ID = stol(file_name);
            url << "https://park.ajinomoto.co.jp/recipe/card/" << ID << "/";
        }
        void extNew(string line)  //文字列抽出用メンバ関数
        {
            line = rm_char(line, ' ');  //半角スペースの除去
            if(line.find("titleText") != string::npos){
                name = rm_bet(line, "<", ">");
            }
            if(line.find("・エネルギー") != string::npos){
                line = rm_bet(line, "<", ">");
                line.erase(0, 18);
                //cout << line.erase(line.size()-4) << endl;
                cal = stof(line);
            }
            if(line.find("・塩分") != string::npos){
                line = rm_bet(line, "<", ">");
                line.erase(0, 9);
                //cout << line.erase(line.size()-1) << endl;
                salt = stof(line);
            }
            if(line.find("bigTitle_quantity") != string::npos){
                line = rm_aro(line, "（", "）");
                //cout << line.erase(line.size()-6) << endl;
                num_p = stof(line);
            }
            if((line.find("recipe_ingredient") != string::npos || line.find("水") != string::npos || ((line.find("「") != string::npos && line.find("</dt>") != string::npos)))){
                ingredient[c_1++] = rm_bet(line, "<", ">");
            }
            if(line.find("<dd>") != string::npos){
                quantity[c_2++] = rm_bet(line, "<", ">");
            }
            if(line.find("numberTxt") != string::npos){
                make_l[c_3] = rm_bet(line, "<", ">");
                make_l[c_3++].erase(0,1);
            }
            if(line.find("inTime") != string::npos){
                line = rm_bet(line, "<", ">");
                //cout << line.erase(line.size()-3) << endl;
                time = stof(line);
            }
        }
};

class kewpie : public Recipe    //キューピークラス
{
    public:
        void setID_URL(string file_name)    //ID、URL設定用メンバ関数
        {
            ID = stol(file_name);
            url << "https://www.kewpie.co.jp/recipes/recipe/QP" << ID << "/";
        }
        void extNew(string line)  //文字列抽出用メンバ関数
        {
            line = rm_char(line, ' ');  //半角スペースの除去
            if(line.find("l-breadcrumb__itm--current") != string::npos){
                name = rm_bet(line, "<", ">");
            }
            if(line.find("エネルギー") != string::npos && line.find("r-list-itm02") != string::npos){
                line = rm_bet(line, "<", ">");
                line.erase(0, 15);
                //cout << line << endl;
                cal = stof(line);
            }
            if(line.find("食塩相当量") != string::npos && line.find("r-list-itm03") != string::npos){
                line = rm_bet(line, "<", ">");
                line.erase(0, 15);
                //cout << line << endl;
                salt = stof(line);
            }
            if(line.find("材料") != string::npos){
                line = rm_aro(line, "（", "）");
                //cout << line << endl;
                num_p = stof(line);
            }
            if((line.find("<th>") != string::npos || line.find("水") != string::npos || ((line.find("「") != string::npos && line.find("</dt>") != string::npos)))){
                ingredient[c_1++] = rm_bet(line, "<", ">");
            }
            if(line.find("c-detail-data") != string::npos){
                quantity[c_2++] = rm_bet(line, "<", ">");
            }
            if(line.find("p-recipe-txt") != string::npos){
                make_l[c_3] = rm_bet(line, "<", ">");
                make_l[c_3++].erase(0,1);
            }
            if(line.find("調理時間") != string::npos){
                line = rm_bet(line, "<", ">");
                line.erase(0, 12);
                //cout << line << endl;
                time = stof(line);
            }
        }
};

class kikkoman : public Recipe  //キッコーマンクラス
{
    public:
        void setID_URL(string file_name)    //ID、URL設定用メンバ関数
        {
            ID = stol(file_name);
            url << "https://www.kikkoman.co.jp/homecook/search/recipe/" << setw(8) << setfill('0') << ID << "/index.html";
        }
        void extNew(string line)  //文字列抽出用メンバ関数
        {
            line = rm_char(line, ' ');  //半角スペースの除去
            if(line.find("headline") != string::npos){
                name = rm_bet(line, "<", ">");
            }
            if(line.find("kcal</b>") != string::npos){
                line = rm_bet(line, "<", ">");
                //line.erase(0, 15);
                //cout << line << endl;
                cal = stof(line);
            }
            if(line.find("g</b>") != string::npos){
                line = rm_bet(line, "<", ">");
                //line.erase(0, 15);
                //cout << line << endl;
                salt = stof(line);
            }
            if(line.find("recipeYield") != string::npos){
                line = rm_aro(line, "（", "）");
                //cout << line << endl;
                num_p = stof(line);
            }
            if((line.find("recipeIngredient") != string::npos)){
                ingredient[c_1++] = rm_bet(line, "<", ">");
            }
            if(line.find("amount") != string::npos){
                quantity[c_2++] = rm_bet(line, "<", ">");
            }
            if(line.find("<li>") != string::npos && line.find("instruction") != string::npos){
                make_l[c_3++] = rm_bet(line, "<", ">");
                //make_l[c_3++].erase(0,1);
            }
            if(line.find("value-title") != string::npos){
                line = rm_bet(line, "<", ">");
                //line.erase(0, 12);
                //cout << line << endl;
                time = stof(line);
            }
        }
};

class mizkan : public Recipe    //mizkanクラス
{
    public:
        void csv_Newout(string dir, string file_name){     //csvファイル出力用メンバ関数(mizkan仕様)
            int i = 0;
            cout << dir<< endl;
            cout << ID << endl;

            //出力ファイルのパスを指定
            ofstream    ofs_1("./data_file/" + dir +"/recipes/" + file_name.erase(file_name.size()-4) + ".csv"),
                        ofs_2("./data_file/" + dir +"/ingredients/" + file_name + ".csv"),
                        ofs_3("./data_file/" + dir +"/make_list/" + file_name + ".csv");
            ofs_1 << ID << "," << name << "," << cal << "," << salt << "," << num_p << "," << time << "," << url.str() << endl;

            while(ingredient[i] != "\0" && quantity[i] != "\0"){
                ofs_2 << ID << "," << ingredient[i] << "," << quantity[i++] << endl;
            }
            i = 0;
            while(make_l[i] != "\0") {
                if(make_l[i].find("※") != string::npos) ofs_3 << ID << "," << "," << make_l[i++] << endl;
                else ofs_3 << ID << "," << i+1 << "," << make_l[i++] << endl;
            }

            ofs_1.close();
            ofs_2.close();
            ofs_3.close();
        }

        void setID_URL(string file_name)    //ID、URL設定用メンバ関数
        {
            ID = stol(file_name);
            url << "https://www.mizkan.co.jp/ouchirecipe/recipe/?menu_id=" << setw(6) << setfill('0') << ID << "/";
        }
        void extNew(string line)  //文字列抽出用メンバ関数
        {
            line = rm_char(line, ' ');  //半角スペースの除去
            if(line.find("recipeTop_ttl") != string::npos){
                name = rm_bet(line, "<", ">");
                //cout << name << endl;
            }
            if(line.find("energy") != string::npos && line.find("u-font-lato") != string::npos){
                line = rm_bet(line, "<", ">");
                //line.erase(0, 15);
                cal = stof(line);
                //cout << cal << endl;
            }
            if(line.find("食塩相当量") != string::npos || flag1 == 1){
                
                if(flag1 == 1){ //次の行場合の処理
                    line = rm_bet(line, "<", ">");
                    //line.erase(0, 15);
                    salt = stof(line);
                    //cout << salt << endl;
                    flag1 = 0;
                }
                else flag1 = 1;
            }
            if(line.find("<strong") != string::npos){
                line = rm_bet(line, "<", ">");
                num_p = stof(line);
                //cout << num_p << endl;
            }
            if(line.find("MenuRecipeGroup") != string::npos || flag2 > 0 || line.find(">水") != string::npos){

                if(flag2 == 3){
                    //cout << line << endl;
                    quantity[c_2++] = line;
                    flag2 = 0;
                }
                else if(flag2 == 2 || flag2 == 1) flag2++;
                else{
                    //cout << "材料:" << line << endl;
                    ingredient[c_1] = rm_bet(line, "<", ">");
                    if(ingredient[c_1] == "水") flag2++;
                    c_1++;
                    flag2++;
                }
            }
            if(line.find("recipeTopAboutHowto_item") != string::npos){
                //cout << line << endl;
                line = Replace_all(line, "<l", ",<");
                line = Replace_all(line, "<span>", ",<");
                line = rm_bet(line, "<", ">");
                line.erase(0, 1);
                //cout << line << endl;
                vector<string> arr = split(line, ",");
                for(int i = 0; i < arr.size(); i++){
                    make_l[i] = arr[i];
                    if(make_l[i].find("※") == string::npos)
                        make_l[i].erase(0, 3);
                }
            }
            if(line.find("time") != string::npos && line.find("分") != string::npos){
                line = rm_bet(line, "<", ">");
                //line.erase(0, 12);
                time = stof(line);
                //cout << time << endl;
            }
        }
};

int main(int argc, char *argv[])
{
    string line, dir = argv[1], file_name = argv[2];        //行読み込み用変数、ディレクトリ名、ファイル名
    ifstream in_file("./recipes/" + dir + "/"+file_name);   //入力ファイルのパスを指定

    //各レシピサイト用のインスタンス生成
    Recipe r;
    ajinomoto aji;  kewpie kew;
    kikkoman kik;   mizkan miz;

    if(!in_file.is_open()){                 //ファイルオープン時のエラー処理
        cerr << "Could not open the file - '" << file_name << "'" << endl;
        return EXIT_FAILURE;
    }else{
        //レシピサイト毎に各メンバ関数を呼び出す
        if(dir == "ajinomoto"){             //味の素の場合
            aji.setID_URL(file_name);
            while(getline(in_file, line)){
                aji.extNew(line);
            }
            aji.csv_out(dir, file_name);
        }else if(dir == "kewpie"){          //キューピーの場合
            kew.setID_URL(file_name);
            while(getline(in_file, line)){
                kew.extNew(line);
            }
            kew.csv_out(dir, file_name);
        }else if(dir == "kikkoman"){        //キッコーマンの場合
            kik.setID_URL(file_name);
            while(getline(in_file, line)){
                kik.extNew(line);
            }
            kik.csv_out(dir, file_name);
        }else if(dir == "mizkan"){          //ヤマサの場合
            miz.setID_URL(file_name);
            while(getline(in_file, line)){
                miz.extNew(line);
            }
            miz.csv_Newout(dir, file_name); 
        }
    }
    //r.csv_out(dir, file_name);
    in_file.close();
    return 0;
}