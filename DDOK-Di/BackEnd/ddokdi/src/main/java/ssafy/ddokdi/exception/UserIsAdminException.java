package ssafy.ddokdi.exception;

public class UserIsAdminException extends RuntimeException {
    public UserIsAdminException() {
        super("해당 유저는 관리자입니다");
    }

    public UserIsAdminException(String message) {
        super(message);
    }
}
