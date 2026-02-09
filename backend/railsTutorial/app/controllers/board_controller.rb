class BoardController < ApplicationController
    def index
        if  params[:id] == nil
            render json: {error: "no provided id"}
        else 
            boardId = params[:id]
            boardIds = []
            i = 0
            boardId.each_char do |char|
                boardIds[i] = char
                i+=1
            end
            if  boardId.length() != 9
                render json: {error: "Board must be 9 squares"}
            else 
                j = 0
                while j < boardIds.length && boardIds[j] != '-'
                    j+=1
                end
                if  j >= boardIds.length
                    render json: {error: "tie"}
                else
                    render json: {square: (j + 1)}
                end
            end
        end
    end
end