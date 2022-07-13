#include <string>
#include <bits/stdc++.h>
#include <fstream>
#include <sstream>
#define N 100
using namespace std;
using std::cout;    using std::cerr;
using std::endl;    using std::string;


class Recipe    //Recipeクラス
{
    private:
        int c_1 = 0, c_2 = 0;   //材料・手順カウンター
        string name;            //料理名
        string cal;             //カロリー
        string salt;            //塩分
        string num_p;           //想定人数
        string Matar[N][2];     //材料・分量
        string make_l[N];       //手順
    public:
        void extract(string n, string c, string s, string p, string* m, string* q, string* l);
        void csv_out(string pass);
};

string removal(string a);

void Recipe::extract(string n, string c, string s, string p, string* m, string* q, string* l) //文字列抽出関数
{
    this->name = removal(n);

    this->cal = removal(c);
    this->cal.erase(0, 3);

    this->salt = removal(s);
    this->salt.erase(0, 3);

    this->num_p = removal(p);

    while(*m != "\0" && *q != "\0")
    {
        this->Matar[this->c_1][0] = removal(*m++);
        this->Matar[this->c_1][0].erase(std::remove(this->Matar[this->c_1][0].begin(), this->Matar[this->c_1][0].end(), ' '), this->Matar[this->c_1][0].end());
        this->Matar[this->c_1++][1] = removal(*q++);
        //std::cout << this->Matar[this->c_1++][0] << std::endl;
    }

    while (*l != "\0")  this->make_l[this->c_2++] = removal(*l++);
}

void Recipe::csv_out(string pass)  //csvファイル出力関数
{
    int i;
    ofstream ofs_csv_file(pass);
    ofs_csv_file << this->name << endl;
    ofs_csv_file << this->cal << endl;
    ofs_csv_file << this->salt << endl;
    ofs_csv_file << this->num_p << endl;
    for(i = 0; i < this->c_1; i++) ofs_csv_file << this->Matar[i][0] << this->Matar[i][1] << endl;
    
    for(i = 0; i < this->c_2; i++)  ofs_csv_file << this->make_l[i] << endl;
}

string removal(string a)    //文字列除去関数
{
    while (a.find("<") != string::npos && a.find(">") != string::npos)
    {
        //std::cout << m.find("<") << " " << m.find(">") << std::endl;
        a.erase(a.find("<"), a.find(">")-a.find("<")+1);    //< から > までの文字列を除去
    }
    return a;
}

int main(int argc, char *argv[])
{
    int c_1 = 0, c_2 = 0;
    string line, name, cal, salt, num_p, M_name[N], M_quan[N], make_l[N];    //行、料理名、エネルギー、塩分、想定人数、材料名、分量、手順
    Recipe r;
    fstream myFile;
    string filename = argv[1];
    myFile.open("./recipes/ajinomoto/"+filename, ios::in);  //txtファイル読み込み

    string output_pass = "./data_file/ajinomoto/"+filename.erase(filename.size()-3)+"csv";   //出力ファイルのパス
    //std::cout << filename << std::endl;
    if(!myFile.is_open()){
        cerr << "Could not open the file - '" << filename << "'" << endl;
        return EXIT_FAILURE;
    }
    else {
        while (getline(myFile, line))   //一行ずつ探索した後、ヒットした文字列が含まれる行を代入
        {
            if(line.find("titleText") != string::npos)
                name = line;
            else if(line.find("・エネルギー") != string::npos)
                cal = line;
            else if(line.find("・塩分") != string::npos)
                salt = line;
            else if(line.find("bigTitle_quantity") != string::npos)
                num_p = line;
            else if(line.find("recipe_ingredient") != string::npos || line.find("水") != string::npos || (line.find("「") != string::npos && line.find("</dt>") != std::string::npos))
                M_name[c_1] = line;
            else if(line.find("<dd>") != string::npos)
                M_quan[c_1++] = line;
            else if(line.find("txt numberTxt") != string::npos)
                make_l[c_2++] = line;
        }
        //std::cout << salt << endl;
        r.extract(name, cal, salt, num_p, M_name, M_quan, make_l);
        r.csv_out(output_pass);

        myFile.close();
    }
    return 0;
}