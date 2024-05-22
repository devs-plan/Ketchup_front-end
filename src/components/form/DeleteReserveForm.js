import { Box, Typography, Button, DialogTitle } from "@mui/material";
import { deleteReserveAPI } from "../../apis/ReserveAPICalls";

export default function DeleteReserveForm({ onCloseDeleteConfirm, selectedReserve }) {
    
    console.log("selectedReserve.rsvNo???", selectedReserve.id);

    const handleDelete = () => {
        try {
            deleteReserveAPI(selectedReserve.id);
            alert("예약이 정상적으로 삭제되었습니다.");
            onCloseDeleteConfirm();
        } catch (error) {
            console.error("예약 삭제 중 에러 발생 handleDelete", error);
            alert("예약 삭제에 실패했습니다.");
        }
    };

    return (
        <>
            <DialogTitle>예약 삭제</DialogTitle>
            <Box p={2}>
                <Typography variant="body1">한 번 삭제하면 다시 복구할 수 없습니다.</Typography>
                <Typography variant="body1">정말로 삭제하시겠습니까?</Typography>
            </Box>
            <Box p={2} display="flex" justifyContent="flex-end">
                <Button onClick={() => onCloseDeleteConfirm(true)} variant="outlined" color="primary">닫기</Button>
                <Button onClick={handleDelete} variant="outlined" color="error" ml={1}>삭제</Button>
            </Box>
        </>
    );
};