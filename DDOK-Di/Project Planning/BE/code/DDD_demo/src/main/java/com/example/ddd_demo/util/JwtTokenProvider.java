package com.example.ddd_demo.util;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;

@Slf4j
public class JwtTokenProvider {

    private static final String SALT = "A102";
    private static final Long TokenValid= 24 *60 * 60*1000L;

    // 복호화해서 유저정보 얻는 메서드들 추가하기ㅁㅁㅁㅁㅁㅁㅁㅁㅁ


    public String createToken(Long id, String accountId, String name) throws UnsupportedEncodingException {
        HashMap<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("accountId", accountId);
        claims.put("name", name);

        Date now = new Date();
        Date exDate = new Date(now.getTime()+TokenValid);
        return Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .addClaims(claims)
                .setIssuedAt(now)
                .setExpiration(exDate)
                .signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8"))
                .compact();
    }

    public boolean valid(String token) throws Exception {
        try {
            Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
            return true;
        } catch (SignatureException sigE) {
            log.error("Invalid JWT signature", sigE);
        } catch (MalformedJwtException malE) {
            log.error("Invalid JWT token", malE);
        } catch (ExpiredJwtException exE) {
            log.error("Expired JWT token", exE);
        } catch (UnsupportedJwtException unE) {
            log.error("Unsupported JWT token", unE);
        } catch (IllegalArgumentException ilE) {
            log.error("JWT claims string is empty.", ilE);
        }
        return false;
    }
}
