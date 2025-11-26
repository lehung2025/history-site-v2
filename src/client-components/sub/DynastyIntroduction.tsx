const DynastyIntroduction = () => {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="text-base sm:text-lg text-left max-w-full sm:max-w-2xl my-4 border-2 border-white bg-black/50 rounded-lg px-4 sm:px-6 md:px-8 py-4 prose prose-invert">
        <h2 className="text-center text-2xl">
          <strong>Giới thiệu</strong>
        </h2>
        <p>
          Trang web này được tạo ra nhằm mục đích khám phá lịch sử Việt Nam, Nhật Bản, và Trung Quốc qua
          các triều đại và thời kỳ quan trọng, nhấn mạnh thành tựu nổi bật:
        </p>
        <ul>
          <li>
            <strong>Việt Nam</strong>: Từ Ngô Quyền đến triều Nguyễn, phản ánh
            tinh thần độc lập dân tộc.{" "}
          </li>
          <li>
            <strong>Nhật Bản</strong>: Từ thời Sengoku đến thời Edo, đánh dấu sự
            thống nhất và văn hóa độc đáo.{" "}
          </li>
          <li>
            <strong>Trung Quốc</strong>: Từ Tam Quốc và Nam Hán đến nhà Thanh,
            tương tác với lịch sử Việt Nam.{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DynastyIntroduction;
