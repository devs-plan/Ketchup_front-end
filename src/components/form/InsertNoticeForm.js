// InsertNoticeForm 컴포넌트
import { useDispatch } from "react-redux";
import ButtonGroup from "../../components/contents/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { callInsertNoticeAPI } from "../../apis/NoticeAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import ReactQuill from "react-quill";

function InsertNoticeForm() {

    // const result = useSelector(state => state.noticeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [fix, setFix] = useState(false);
    const [content, setContent] = useState('');
    const quillRef = useRef();

    let memberNo = ''; 
    // let name = '';

    const isLogin = window.localStorage.getItem("accessToken");
    let decoded = null;

    if (isLogin !== undefined && isLogin !== null) {
        const decodedTokenInfo = decodeJwt(window.localStorage.getItem("accessToken"));
        decoded = decodedTokenInfo.role;

        memberNo = decodedTokenInfo.memberNo; // 함수 내부에서 memberId 할당
        // name = decodedTokenInfo.name;
    }

    const handleChangeColor = (color) => {
        const quill = quillRef.current.getEditor();
        quill.format('color', color);
    };

    const handleFixChange = (e) => {
        const isChecked = e.target.checked;
        setFix(isChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const htmlContent = content;
            console.log(title);
            console.log(htmlContent);
            console.log(fix);
            console.log(memberNo);

            // formData.append('noticeDTO', new Blob([JSON.stringify({ noticeTitle: title, memeberNo: memberNo, noticeFix: fix, noticeContent: htmlContent })], { type: 'application/json' }));
            formData.append('noticeDTO',  JSON.stringify({ noticeTitle: title, memberNo: memberNo, noticeFix: fix ? 'Y' : 'N',  noticeContent: htmlContent }));
            files.forEach(file => formData.append('uploadFile', file)); // 모든 파일을 FormData에 추가

        
            console.log('handleSubmit [ formData ] : ', formData.get('noticeDTO'));

            dispatch(callInsertNoticeAPI(formData));
            // navigate('/notices');
        } catch (error) {
            console.error(error);
            // 등록 실패 시 처리
        }
    };
    
    const handleChangeFiles = (e) => {
        setFiles([...e.target.files]); // 모든 파일을 파일 목록에 추가
    };




    const buttons = [
        { label: '취소', onClick: () => navigate(-1), styleClass: 'back' },
        { label: '등록', onClick: handleSubmit, styleClass: 'move' }
    ];

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    // useEffect(() => {
    //     const plainTextContent = content.replace(/(<([^>]+)>)/gi, "");
    //     const markdownContent = `# \n${plainTextContent}`;
    //     remark().use(remarkHtml).process(markdownContent, function (err, file) {
    //         if (err) throw err;
    //         setPreviewContent(String(file));
    //     });
    // }, [content, title]);

    return (
        <main id="main" className="main">
            <div className="title">
                <h2>공지사항</h2>
            </div>

            <div className="col-lg-12">
                <div className="list">
                    <div className="card-title">
                        <div className="input-container">
                            <label htmlFor="title">제목</label>
                            <input type="text" id="title" placeholder=" 공지 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="input-container">
                            <label htmlFor="file">첨부파일</label>
                            <div className="file-input">
                                <input type="file" id="formFile" multiple onChange={handleChangeFiles} />
                            </div>
                        </div>
                        <input type="checkbox" id="fix" checked={fix} onChange={handleFixChange} /> &nbsp;
                        <label htmlFor="fix">최상단에 공지로 등록</label>
                    </div>
                    <div className="editor-container">
                        <ReactQuill
                            style={{ height: "300px", margin1: "4px", overflowY: 'auto' }}
                            ref={quillRef}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            placeholder="내용을 입력하세요."
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                    [{ 'font': [] }],
                                    [{ 'align': [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'color': [] }, { 'background': [] }],
                                    ['link', 'image', 'video'],
                                    ['clean']
                                ]
                            }}
                        />
                    </div>
                    <ButtonGroup buttons={buttons} />
                </div>
            </div>
        </main>
    );
};

export default InsertNoticeForm;