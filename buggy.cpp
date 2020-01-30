// g++ -g buggy.cpp -o buggy
#include <bits/stdc++.h>

#include <iostream>
#define MAX_BOOKS 32

class Book {
 public:
  std::string title;
  std::string author;
  u_int32_t isbn;
};

void welcome() {}

void menu() {
  std::cout << "What do you want to do?" << std::endl;
  std::cout << "\t1) add book to catalog" << std::endl;
  std::cout << "\t2) remove book from catalog" << std::endl;
  std::cout << "\t3) edit book in catalog" << std::endl;
}

int main() {
  Book* catalog[MAX_BOOKS];
  u_int8_t book_count = 0;

  welcome();
  while (true) {
    menu();
    int choice = 0;
    std::cin >> choice;

    switch (choice) {
      case 1: {
        catalog[book_count];
        Book* book = new Book();

        std::cout << "Title: ";
        std::cin >> book->title;
        std::cout << "Author: ";
        std::cin >> book->author;
        std::cout << "ISBN: ";
        std::cin >> book->isbn;

        catalog[book_count] = book;
        break;
      }

      case 2: {
        int index;
        std::cout << "Index: ";
        std::cin >> index;
        delete catalog[index];
        break;
      }

      case 3: {
        int index;
        std::cout << "Index: ";
        std::cin >> index;
        Book* book = catalog[index];

        std::cout << "Title: ";
        std::cin >> book->title;
        std::cout << "Author: ";
        std::cin >> book->author;
        std::cout << "ISBN: ";
        std::cin >> book->isbn;
        break;
      }

      default:
        exit(0);
    }
  }
}