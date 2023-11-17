//
// Created by aluno on 17/11/2023.
//

#include <iostream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

int teste(){
    cout << "Ola mundo!" << endl;
    VideoCapture cap(0);

    if(!cap.isOpened()){
        cerr << "Erro ao abrir a câmera." << endl;
        return -1;
    }

    while(true){
        Mat frame;
        cap >> frame;
        if(frame.empty()){
            cerr << "Erro ao capturar o frame." << endl;
            break;
        }
        imshow("Webcan", frame);
        if(waitKey(30)>=0){
            break;
        }
        cap.release();
        destroyAllWindows();
        return -1;
    }
}