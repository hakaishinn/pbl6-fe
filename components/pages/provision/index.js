import classNames from 'classnames/bind';
import styles from '/styles/pages/policy.module.scss';

const cx = classNames.bind(styles);

import DefaultLayout from '../../../layout/defaultLayout';

function Provision() {
    return (
        <DefaultLayout>
            <div className="container">
                <p className={cx('header')}>
                    Quý khách vui lòng đọc bản <strong>"Điều khoản sử dụng"</strong> dưới đây để hiểu hơn những cam kết
                    mà chúng tôi thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập.
                </p>
                <ol>
                    <li className={cx('title')}>Giới thiệu</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>Chào mừng quý khách hàng đến với https://www.hikaru.vn/.</li>
                            <li>
                                Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý
                                với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ
                                phần nào trong Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu
                                lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách
                                tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có
                                nghĩa là quý khách chấp nhận với những thay đổi đó.
                            </li>
                            <li>
                                Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Hướng dẫn sử dụng website</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy cập dưới sự
                                giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng đảm bảo có đầy đủ hành vi dân
                                sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật
                                Việt Nam.
                            </li>
                            <li>
                                Chúng tôi sẽ cấp một tài khoản (Account) sử dụng để khách hàng có thể mua sắm trên
                                website https://www.hikaru.vn/ trong khuôn khổ Điều khoản và Điều kiện sử dụng đã đề ra.
                            </li>
                            <li>
                                Quý khách hàng sẽ phải đăng ký tài khoản với thông tin xác thực về bản thân và phải cập
                                nhật nếu có bất kỳ thay đổi nào. Mỗi người truy cập phải có trách nhiệm với mật khẩu,
                                tài khoản và hoạt động của mình trên web. Hơn nữa, quý khách hàng phải thông báo cho
                                chúng tôi biết khi tài khoản bị truy cập trái phép. Chúng tôi không chịu bất kỳ trách
                                nhiệm nào, dù trực tiếp hay gián tiếp, đối với những thiệt hại hoặc mất mát gây ra do
                                quý khách không tuân thủ quy định.
                            </li>
                            <li>
                                Trong suốt quá trình đăng ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu
                                không muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào đường link ở
                                dưới cùng trong mọi email quảng cáo.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Chấp nhận đơn hàng và giá cả</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Chúng tôi có quyền từ chối hoặc hủy đơn hàng của quý khách vì bất kỳ lý do gì liên quan
                                đến lỗi kỹ thuật, nhập sai thông tin cá nhân (Email, Họ tên, SĐT liên lạc...).
                            </li>
                            <li>
                                Chúng tôi cam kết sẽ cung cấp thông tin giá cả chính xác nhất cho người tiêu dùng. Tuy
                                nhiên, đôi lúc vẫn có sai sót xảy ra, ví dụ như trường hợp giá sản phẩm không hiển thị
                                chính xác trên trang web hoặc sai giá, tùy theo từng trường hợp chúng tôi sẽ liên hệ
                                hướng dẫn hoặc thông báo hủy đơn hàng đó cho quý khách. Chúng tôi cũng có quyền từ chối
                                hoặc hủy bỏ bất kỳ đơn hàng nào dù đơn hàng đó đã hay chưa được xác nhận hoặc đã thanh
                                toán.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Giải quyết hậu quả do lỗi nhập sai thông tin</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Khách hàng có trách nhiệm cung cấp thông tin đầy đủ và chính xác khi tham gia giao dịch
                                tại trang web chúng tôi. Trường hợp chúng tôi không thể liên hệ được với quý khách để
                                xác nhận do nhập sai thông tin (Email, SĐT liên lạc...), chúng tôi có quyền từ chối thực
                                hiện giao dịch.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Quyền lợi bảo mật thông tin của khách hàng</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Trang web của chúng tôi coi trọng việc bảo mật thông tin và sử dụng các biện pháp tốt
                                nhất bảo vệ thông tin và việc thanh toán của quý khách.
                            </li>
                            <li>
                                Thông tin của quí khách tại https://www.hikaru.vn/ sẽ được chúng tôi bảo mật và chỉ
                                trong trường hợp pháp luật yêu cầu, chúng tôi sẽ buộc phải cung cấp những thông tin này
                                cho các cơ quan pháp luật.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Thanh toán an toàn và tiện lợi </li>
                    <div className={cx('content')}>
                        <p>
                            Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương
                            thức phù hợp:
                        </p>
                        <p>
                            <strong>Cách 1:</strong>Thanh toán trực tiếp (nhận hàng tại cửa hàng của Hikaru).
                        </p>
                        <p>
                            <strong>Cách 2:</strong>Thanh toán khi nhận hàng (COD).
                        </p>
                        <p>
                            <strong>Cách 3:</strong>Thanh toán chuyển khoản.
                        </p>
                    </div>
                    <li className={cx('title')}>Thay đổi về chính sách</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Chúng tôi hoàn toàn có thể thay đổi nội dung trong trang này mà không cần phải thông báo
                                trước, để phù hợp với các nhu cầu của Hikaru cũng như nhu cầu và sự phản hồi từ khách
                                hàng nếu có. Khi cập nhật nội dung chính sách này, chúng tôi sẽ chỉnh sửa lại thời gian
                                "Cập nhật lần cuối" bên dưới.
                            </li>
                            <li>
                                Nội dung “Điều khoản sử dụng” này chỉ áp dụng tại Hikaru, không bao gồm hoặc liên quan
                                đến các bên thứ ba đặt quảng cáo hay có link (liên kết) tại Hikaru. Chúng tôi khuyến
                                khích bạn đọc kỹ “Điều khoản sử dụng” của các trang web bên thứ ba trước khi cung cấp
                                thông tin cá nhân cho các trang web đó. Chúng tôi không chịu trách nhiệm dưới bất kỳ
                                hình thức nào về nội dung và tính pháp lý của trang web thuộc bên thứ ba.
                            </li>
                            <li>
                                Vì vậy, bạn đã đồng ý rằng, khi bạn sử dụng website của chúng tôi sau khi chỉnh sửa
                                nghĩa là bạn đã thừa nhận, đồng ý tuân thủ cũng như tin tưởng vào sự chỉnh sửa này. Do
                                đó, chúng tôi đề nghị bạn nên xem trước nội dung trang này trước khi truy cập các nội
                                dung khác trên website cũng như bạn nên đọc và tham khảo kỹ nội dung “Điều khoản sử
                                dụng” của từng website mà bạn đang truy cập.
                            </li>
                        </ul>
                    </div>
                    <li className={cx('title')}>Thông tin liên hệ</li>
                    <div className={cx('content')}>
                        <ul>
                            <li>
                                Hikaru rất cảm ơn và khuyến khích quý khách đóng góp ý kiến giúp chúng tôi hoàn thiện
                                hơn nhằm phục vụ quý khách tốt hơn.
                            </li>
                            <li>
                                Mọi ý kiến đóng góp xin vui lòng liên hệ qua SĐT: <strong>0385078386</strong> hoặc gửi
                                email cho chúng tôi.
                            </li>
                        </ul>
                    </div>
                </ol>
            </div>
        </DefaultLayout>
    );
}

export default Provision;
