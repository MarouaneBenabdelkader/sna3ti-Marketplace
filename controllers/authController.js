const bcrypt = require('bcrypt');
const { User } = require("../shared/User");
const { PhoneNumber } = require("../shared/PhoneNumber");
const { Handicraft } = require("../models/Handicraft");
const { Customer } = require("../models/Customer");
const jwt = require("jsonwebtoken");
const { transporter } = require("../middlewares/emailTransporter");
exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        // Find the User with the given email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: "badRequest",
                message: "User with this email does not exist",
                status: 400,
            });
        }

        // Check if the provided password is correct
        if (!user.isValidPassword(password)) {
            return res.status(400).json({
                error: "badRequest",
                message: "Invalid password",
                status: 400,
            });
        }

        //CHECK : if the user is a costumer and his email is not verified

        if (user.__t == "Customer" && !user.emailVerified) {
            return res.status(401).json({
                error: "unAuthorized",
                message: "Email not verified please verify your email",
                status: 401,
            });
        }
        // Check the phone number of the handicraft is verified or not

        if (user.__t == "Handicraft" && !user.phoneNumber.isVerified) {
            return res.status(401).json({
                error: "unAuthorized",
                message: "Phone number not verified please verify your phone number",
                status: 401,
            });
        }

        // check if the Handicraft has been checked by the admin
        if (user.__t == "Handicraft" && !user.checked) {
            return res.status(401).json({
                error: "unAuthorized",
                message: "Under validation process",
                status: 401,
            });
        }


        // Create a JWT token for the authenticated User
        const token = jwt.sign(
            {
                user: {
                    id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    profileImage: user.profileImage,
                    craft: user.craft,
                    address: user.address,
                    role: user.__t.toLowerCase(),
                    __t: user.__t,
                },
            },
            process.env.jwtSecret,
            {
                expiresIn: "3d",
            }
        );

        // add cookie AS JWT
        res.cookie("jwt", token, { httpOnly: true, expiresIn: "3d" });

        // Send the token and User data to the client
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                profileImage: user.profileImage,
                craft: user.craft,
                address: user.address,
                rates: user.rates,
                role: user.__t.toLowerCase(),
                following: user.following,
                __t: user.__t,
            },
        });
    } catch (error) {
        // Handle any errors that occurred
        res
            .status(500)
            .json({
                error: "internalServerError",
                message: "An error occurred while logging in " + error.message,
                status: 500,
            });
    }

}
exports.logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.send({
        status: 200,
        message: "logout successful",
    });
}
exports.forgotPassword = async (req, res) => {
    const { email, phoneNumber } = req.body;

    try {
        // Check if either email or phoneNumber is provided
        if (!email && !phoneNumber) {
            return res.status(400).json({ error: 'Please provide email or phoneNumber' });
        }

        let user;

        // If email is provided, find the user by email
        if (email) {
            user = await User.findOne({ email });
        }

        // If phoneNumber is provided and user not found, find the user by phoneNumber
        if (!user && phoneNumber) {
            user = await User.findOne({ 'phoneNumber.number': phoneNumber });
        }

        // If no user found, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a unique password reset token (e.g., using crypto library)
        const resetToken = await generateResetToken(user);

        // Save the reset token to the user document (e.g., in a resetToken field)
        user.resetToken = resetToken;
        await user.save();

        // Construct the password reset link using the reset token
        const resetLink = `${process.env.DOMAINNAME}/reset-password?token=${resetToken}`;

        // Compose the email message
        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset',
            text: `Hello ${user.email},\n\nPlease click on the following link to reset your password:\n${resetLink}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Return success response
        res.status(200).json({
            message: 'Password reset instructions sent successfully',
            status: 200,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error',
            message: 'An error occurred while processing your request' + error.message,
            status: 500,
        });
    }
}
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Find the user with the provided reset token
        const user = await User.findOne({ resetToken: token });

        // If no user found, return an error
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token' });
        }

        // Update the user's password with the new password
        user.password = bcrypt.hashSync(newPassword, 10);

        user.resetToken = undefined; // Clear the reset token
        await user.save();

        // Return success response
        res.status(200).json({
            message: 'Password reset successful',
            status: 200,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error',
            message: 'An error occurred while processing your request' + error.message,
            status: 500,
        });
    }
}
exports.verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;

    try {
        const customer = await Customer.findOne({ emailVerificationToken: verificationToken });

        if (!customer) {
            return res.status(400).json({
                error: 'Invalid or expired verification token',
                message: 'Please request a new verification token',
                status: 400,
            });
        }

        customer.emailVerified = true;
        customer.emailVerificationToken = undefined;

        await customer.save();

        res.status(200).json({
            message: 'Your email has been verified successfully. you can login now.',
            status: 200,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error',
            message: 'An error occurred while processing your request' + error.message,
            status: 500,
        });
    }
};
exports.verifyPhoneNumber = async (req, res) => {
    try {
        const { phoneNumber, verificationCode } = req.body;
        if (!phoneNumber || !verificationCode) {
            return res.status(400).json({
                status: 400,
                error: "bad request",
                message: "phone number and verification code are required",
            });
        }

        const phoneNumberDb = await PhoneNumber.findOne({ number: phoneNumber });

        if (!phoneNumberDb) {
            return res.status(400).send({
                status: 400,
                error: "bad request",
                message: "Invalid phone number",
            });
        }

        if (phoneNumberDb.verificationCode != verificationCode) {
            return res.status(400).send({
                status: 400,
                error: "bad request",
                message: "Invalid verification code",
            });
        }

        phoneNumberDb.isVerified = true;
        await phoneNumberDb.save();

        res.status(200).send({
            status: 200,
            message: "Phone number successfully verified",
        });
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: "server failed",
            message: "Error verifying phone number: " + error.message,
        });
    }
};

// Function to generate a reset token
const generateResetToken = async (user) => {
    try {
        const saltRounds = 10;
        const uniqueString = `${user.email}${Date.now()}`; // Use user-specific data and timestamp

        // Generate a hash of the unique string
        const hash = await bcrypt.hash(uniqueString, saltRounds);

        // Return the hash as the reset token
        return hash;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating reset token');
    }
};
exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                status: 400,
                error: "bad request",
                message: "old password and new password are required",
            });
        } else if (oldPassword === newPassword) {
            return res.status(400).send({
                status: 400,
                error: "bad request",
                message: "old password and new password cannot be the same",
            });
        }


        // Fetch the user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({
                status: 404,
                error: "User not found",
                message: "No user found with this ID.",
            });
        }

        // Check if the old password is correct
        if (!user.isValidPassword(oldPassword)) {
            return res.status(401).send({
                status: 401,
                error: "Authentication failed",
                message: "Old password is incorrect.",
            });
        }

        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            status: 200,
            message: "Password changed successfully.",
        });
    } catch (error) {
        return res.status(500).send({
            status: 500,
            error: "Server error",
            message: "Error changing password: " + error.message,
        });
    }
};