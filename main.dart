void main() {
  List<int> list = [4, 7, 17, 9, 11, -3];

  int enBoyuk = Boyuk(list);
  int enKicik = Kicik(list);
  int cem = Cemi(list);
  double ortalama = Ortasi(list);

  print('En boyuk: $enBoyuk');
  print('En kicik: $enKicik');
  print('Cemi: $cem');
  print('ortalama: $ortalama');
}

int Boyuk(List<int> list) {
  int enBoyuk = list[0];
  for (int i = 1; i < list.length; i++) {
    if (list[i] > enBoyuk) {
      enBoyuk = list[i];
    }
  }
  return enBoyuk;
}

int Kicik(List<int> list) {
  int enKicik = list[0];
  for (int i = 1; i < list.length; i++) {
    if (list[i] < enKicik) {
      enKicik = list[i];
    }
  }
  return enKicik;
}

int Cemi(List<int> list) {
  int cem = 0;
  for (int i = 0; i < list.length; i++) {
    cem += list[i];
  }
  return cem;
}

double Ortasi(List<int> list) {
  int cem = Cemi(list);
  double ortalama = cem / list.length;
  return ortalama;
}