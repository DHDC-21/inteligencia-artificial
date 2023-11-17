cmake_minimum_required(VERSION 3.24)
project(inteligencia_artificial)

# Encontrndo o OpenCV
find_package(OpenCV REQUIRED)
include_directories(${OpenCV_INCLUDE_DIRS})

set(CMAKE_CXX_STANDARD 23)

# Adcionando os aruivos fonte do projeto
add_executable(inteligencia_artificial main.cpp funcoes.cpp)
target_link_libraries(inteligencia_artificial ${OpenCV_LIBS})