import {maSinhVien} from '../components/login/login';
import axios from 'axios';
import {token} from '../components/login/login';

var api = 'https://apiv2.uneti.edu.vn/api/SP_MC_MaSinhVien/Load_Web_App_Para';
const ThongTinSinhVien = {
  IdSinhVien: '',
  Hodem: '',
  Ten: '',
  GioiTinh: '',
  NgaySinh: '',
  NoiSinh: '',
  SoCMND: '',
  NgayCapCMND: '',
  NoiCapCMND: '',
  SoTaiKhoan: '',
  TenTaiKhoan: '',
  ChiNhanhNganHang: '',
  Email_TruongCap: '',
  SoDienThoai: '',
  SoDienThoai2: '',
  SoDienThoai3: '',
  DiaChiThuongTru: '',
  DiaChiLienHe: '',
  SoDienThoaiPhuHuynh: '',
  ThoiGianVaoTruong: '',
  TrangThaiHocTap: '',
  CoSo: '',
  KhoaHoc: '',
  Khoa: '',
  BacDaoTao: '',
  LoaiHinhDaoTao: '',
  ChuyenNganh: '',
  LopHoc: '',
  Role: '',
  Hinhanh:''
};

const getThongTinhSinhVien = async () => {
  try {
    const response = await axios.post(
      api,
      {
        TC_SV_MaSinhVien: maSinhVien,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    response.data.body.map(function (td) {
      ThongTinSinhVien.IdSinhVien = td.IdSinhVien;
      ThongTinSinhVien.Hodem = td.HoDem;
      ThongTinSinhVien.Ten = td.Ten;
      ThongTinSinhVien.GioiTinh = td.GioiTinh;
      ThongTinSinhVien.NgaySinh = td.NgaySinh;
      ThongTinSinhVien.NoiSinh = td.NoiSinh;
      ThongTinSinhVien.SoCMND = td.SoCMND;
      ThongTinSinhVien.NgayCapCMND = td.NgayCapCMND;
      ThongTinSinhVien.NoiCapCMND = td.NoiCapCMND;
      ThongTinSinhVien.SoTaiKhoan = td.SoTaiKhoan;
      ThongTinSinhVien.TenTaiKhoan = td.TenTaiKhoan;
      ThongTinSinhVien.ChiNhanhNganHang = td.ChiNhanhNganHang;
      ThongTinSinhVien.Email_TruongCap = td.Email_TruongCap;
      ThongTinSinhVien.SoDienThoai = td.SoDienThoai;
      ThongTinSinhVien.SoDienThoai2 = td.SoDienThoai2;
      ThongTinSinhVien.SoDienThoai3 = td.SoDienThoai3;
      ThongTinSinhVien.DiaChiThuongTru = td.DiaChiThuongTru;
      ThongTinSinhVien.DiaChiLienHe = td.DiaChiLienHe;
      ThongTinSinhVien.SoDienThoaiPhuHuynh = td.SoDienThoaiPhuHuynh;
      ThongTinSinhVien.ThoiGianVaoTruong = td.ThoiGianVaoTruong;
      ThongTinSinhVien.TrangThaiHocTap = td.TrangThaiHocTap;
      ThongTinSinhVien.CoSo = td.CoSo;
      ThongTinSinhVien.KhoaHoc = td.KhoaHoc;
      ThongTinSinhVien.Khoa = td.Khoa;
      ThongTinSinhVien.BacDaoTao = td.BacDaoTao;
      ThongTinSinhVien.LoaiHinhDaoTao = td.LoaiHinhDaoTao;
      ThongTinSinhVien.ChuyenNganh = td.ChuyenNganh;
      ThongTinSinhVien.LopHoc = td.LopHoc;
      ThongTinSinhVien.Role = td.Role;
      ThongTinSinhVien.Hinhanh=td.HinhAnh;
    });
  } catch (error) {
    console.error(error);
  }
};

export {getThongTinhSinhVien, ThongTinSinhVien};
