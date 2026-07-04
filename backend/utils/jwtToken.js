const generateToken = (user, message, statusCode, res)=>{
    const token = user.generateJsonWebToken();
    res.status(statusCode)
        .cookie("portfolio_token", token, {
        expires: new Date(Date.now() + (30*24*3600000)),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
    .json({
        success: true,
        message,
        user,
        token,
    });
}
module.exports = {generateToken}
