package com.toolc.security;

public final class SecurityConstants {
    
    public static final String JWT_SECRET_KEY = "BD4D8CB8E16DEE4B03820353A1D4C8297798B871007B92F720274FC60EAAB6C3";
    public static final long JWT_EXPIRATION_TIME = 86_400_000;  //one day
    //public static final long JWT_EXPIRATION_TIME = 60_000; //one minute
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    
    public static final long PASSWORD_RESET_EXPIRATION_TIME = 86_400_000; //one day;
    public static final long REGISTER_EXPIRATION_TIME = 86_400_000 * 5;
    
    
}
