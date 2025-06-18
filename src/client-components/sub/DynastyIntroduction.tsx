import Link from "next/link";

const DynastyIntroduction = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="text-base sm:text-lg text-left max-w-full sm:max-w-2xl my-4 border-2 border-white bg-black/50 rounded-lg px-4 sm:px-6 md:px-8 py-4 prose prose-invert">
        <h2 className="text-center text-2xl">
          <strong>Giới thiệu</strong>
        </h2>
        <p>
          Trang web này khám phá lịch sử Việt Nam, Nhật Bản, và Trung Quốc qua
          các triều đại và thời kỳ quan trọng, nhấn mạnh thành tựu nổi bật:
        </p>
        <ul>
          <li>
            <strong>Việt Nam</strong>: Từ Ngô Quyền đến triều Nguyễn, phản ánh
            tinh thần độc lập dân tộc.{" "}
            <Link
              href="/timelines/vietnam-timelines"
              className="underline hover:text-gray-300"
            >
              Xem dòng thời gian
            </Link>
          </li>
          <li>
            <strong>Nhật Bản</strong>: Từ thời Sengoku đến thời Edo, đánh dấu sự
            thống nhất và văn hóa độc đáo.{" "}
            <Link
              href="/timelines/japan-timelines"
              className="underline hover:text-gray-300"
            >
              Xem dòng thời gian
            </Link>
          </li>
          <li>
            <strong>Trung Quốc</strong>: Từ Tam Quốc và Nam Hán đến nhà Thanh,
            tương tác với lịch sử Việt Nam.{" "}
            <Link
              href="/timelines/china-timelines"
              className="underline hover:text-gray-300"
            >
              Xem dòng thời gian
            </Link>
          </li>
        </ul>

        <h3>Lý do chọn mốc thời gian</h3>
        <p>
          Mốc 938 (Việt Nam) và 1467 (Nhật Bản) đánh dấu các bước ngoặt lớn:
          Việt Nam giành độc lập qua trận Bạch Đằng, Nhật Bản bước vào thời
          Sengoku dẫn đến thống nhất. Các mốc này dễ hiểu, khơi gợi tự hào dân
          tộc, và phù hợp với người đọc Việt Nam. Do khó tìm tư liệu hình ảnh
          cho giai đoạn sớm hơn, chúng tôi tập trung vào các giai đoạn trình bày
          sống động.
        </p>

        <h3>Thành tựu nổi bật của các triều đại</h3>
        <p>
          <strong>Việt Nam:</strong>
        </p>
        <ul>
          <li>
            Nhà Ngô, Đinh, Tiền Lê: Giành độc lập từ Trung Quốc, đặt nền móng
            Đại Cồ Việt.
          </li>
          <li>
            Nhà Lý: Dời đô Thăng Long, đổi tên Đại Việt, phát triển Nho giáo.
          </li>
          <li>Nhà Trần: Đánh bại Mông Nguyên ba lần, rực rỡ thơ văn.</li>
          <li>Nhà Hồ: Cải cách hành chính táo bạo.</li>
          <li>Nhà Hậu Lê: Khôi phục độc lập, ban hành luật Hồng Đức.</li>
          <li>
            Nam Bắc Triều: Nội chiến Mạc vs. Lê-Trịnh, phát triển văn hóa.
          </li>
          <li>Nhà Lê trung hưng: Mở rộng Nam Bộ, thúc đẩy thương mại.</li>
          <li>Nhà Tây Sơn: Đánh bại quân Xiêm và Thanh.</li>
          <li>Nhà Nguyễn: Thống nhất Việt Nam, xây kinh đô Huế.</li>
        </ul>
        <p>
          <strong>Nhật Bản:</strong>
        </p>
        <ul>
          <li>
            Thời kỳ Sengoku: Đột phá chiến thuật quân sự, Thiền tông nở rộ.
          </li>
          <li>
            Thời kỳ Azuchi-Momoyama: Thống nhất Nhật Bản, phát triển trà đạo.
          </li>
          <li>
            Thời kỳ Edo: Hòa bình 260 năm, văn hóa thị dân (ukiyo-e, kabuki).
          </li>
        </ul>
        <p>
          <strong>Trung Quốc:</strong>
        </p>
        <ul>
          <li>Tam Quốc: Sáng tạo văn học, di sản Tam Quốc Diễn Nghĩa.</li>
          <li>Nam Hán: Thúc đẩy giao thương Đông Nam Á.</li>
          <li>Nhà Tống: Phát minh la bàn, in ấn, dẫn đầu kinh tế.</li>
          <li>Nhà Nguyên: Mở rộng Con đường Tơ lụa.</li>
          <li>Nhà Minh: Thám hiểm biển với Trịnh Hòa.</li>
          <li>Nhà Thanh: Mở rộng lãnh thổ lớn nhất.</li>
        </ul>

        <h3>Nguồn tham khảo</h3>
        <ul>
          <li>
            <em>Đại Việt Sử Ký Toàn Thư</em> (Ngô Sĩ Liên, 1479, Nhà xuất bản
            Văn hóa Thông tin)
          </li>
          <li>
            <em>Nihon Shoki</em> (720, University of Tokyo Press, bản dịch)
          </li>
          <li>
            <em>Tam Quốc Chí</em> (Trần Thọ, thế kỷ 3, Nhà xuất bản Khoa học Xã
            hội, bản dịch)
          </li>
          <li>
            <em>Tư Trị Thông Giám</em> (Tư Mã Quang, thời Tống, Nhà xuất bản
            Khoa học Xã hội)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DynastyIntroduction;
