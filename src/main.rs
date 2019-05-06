// use std::collections::HashMap;
use std::fs::File;
use std::io::{Write, BufReader, BufRead, Error};

fn main() -> Result<(), Error> {
    let path = "output.txt";
    let mut output = File::create(path)?;
    let mut num_words = 0;

    let input = File::open("words.txt")?;
    let buffered = BufReader::new(input);

    let emoji = [
        "a",
        "b",
        "o",
        "m",
        "p",
        "i",
        "c",
        "r"
    ];
    let sequence_emoji = [
        "ab",
        "cl",
        "sos",
        "atm",
        "wc",
        "ng",
        "ok",
        "up",
        "cool",
        "new",
        "free",
        "tm",
        "end",
        "back",
        "on",
        "top",
        "soon"
    ];

    for word in buffered.lines() {
        let word = word.expect("Error getting word from input.");
        let mut remaining_letters = word.clone();

        for sequence in &sequence_emoji {
            if remaining_letters.contains(sequence) {
                remaining_letters = remaining_letters.replace(sequence, ""); // emoji_hash[sequence]
            }
        }

        for letter in &emoji {
            remaining_letters = remaining_letters.replace(letter, ""); // emoji_hash[letter]
        }

        if remaining_letters.len() == 0 {
            num_words += 1;
            write!(output, "{}\n", word)?;
        }
    }

    println!("Found {} words that can be written with emoji & wrote to {}.", num_words, path);

    Ok(())
}