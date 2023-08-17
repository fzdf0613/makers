export default function Footer() {
  return (
    <div className="bg-[#f8f8f8] p-5 pb-[82px] text-[11px] text-[#a6a6a6]">
      <ul className="text-black flex gap-2">
        <li>고객센터</li>
        <li>이용약관</li>
        <li>개인정보처리방침</li>
        <li>지식재산권보호 센터</li>
      </ul>
      <p className="mt-4">
        메이커스에서 판매하는 상품 중에는 개별판매자가 판매하는 상품이 포함되어
        있습니다. 개별판매자가 판매하는 상품에 대해 메이커스는
        통신중개판매업자로서 통신판매의 당사자가 아니며 상품의 주문, 배송 및
        환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
      </p>
      <div className="font-bold text-lg mt-7">Makers</div>
      <div className="mt-7 flex flex-col gap-1">
        <dt>기업명</dt>
        <dt>주소</dt>
        <dt>사업자등록번호</dt>
        <dt>통신판매업신고번호</dt>
        <dt>호스팅서비스사업자</dt>
        <dt>구매안전서비스</dt>
        <dt>이메일</dt>
        <dt>고객센터</dt>
      </div>
    </div>
  );
}
