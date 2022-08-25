package ssafy.ddokdi.exception;

public class UserAndJwtMismatchException extends RuntimeException {

    public UserAndJwtMismatchException(String message) {
        super(message);
    }
}
